import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import { deleteJob } from "../../services/jobService";
import { exportCSV, exportPDF } from "../../utils/exportUtils";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

const KanbanBoard = ({ jobs = [], onStatusChange }) => {
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const jobId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;

    if (onStatusChange) {
      onStatusChange(jobId, newStatus);
    }
  };

  const handleEdit = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-3 px-4 mt-4">
        <button
          onClick={() => exportCSV(jobs)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
        >
          Export CSV
        </button>

        <button
          onClick={() => exportPDF(jobs)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
        >
          Export PDF
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 px-4">
          {statuses.map((status) => {
            const filteredJobs = jobs.filter(
              (job) => job.status === status
            );

            return (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 p-3 rounded-xl min-h-[350px]"
                  >
                    <h3 className="text-center font-bold mb-3 text-gray-700">
                      {status}
                    </h3>

                    <div className="flex flex-col gap-3">
                      {filteredJobs.map((job, index) => (
                        <Draggable
                          key={job.id}
                          draggableId={job.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div {...provided.dragHandleProps}>
                                <JobCard
                                  job={job}
                                  onEdit={handleEdit}
                                  onDelete={handleDelete}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {filteredJobs.length === 0 && (
                        <p className="text-center text-gray-400 text-sm mt-2">
                          No jobs
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;