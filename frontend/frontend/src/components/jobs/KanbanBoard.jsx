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
      <div className="flex justify-between items-center px-2 mt-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight font-[Outfit]">Board View</h2>
        <div className="flex gap-3">
          <button
            onClick={() => exportCSV(jobs)}
            className="text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportPDF(jobs)}
            className="text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            Export PDF
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 px-2 pb-6 min-h-[500px]">
          {statuses.map((status) => {
            const filteredJobs = jobs.filter(
              (job) => job.status === status
            );

            // Give each status a subtle colored accent dot
            const statusColors = {
              Applied: "bg-blue-500",
              Interview: "bg-purple-500",
              Offer: "bg-green-500",
              Rejected: "bg-red-500"
            };

            return (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 min-w-[280px] bg-gray-50/50 rounded-2xl border transition-colors duration-200 ${
                      snapshot.isDraggingOver ? "border-gray-300 bg-gray-100/50" : "border-gray-200/60"
                    } p-4`}
                  >
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {status}
                      </h3>
                      <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-200/50 px-2 py-0.5 rounded-full">
                        {filteredJobs.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 min-h-[150px]">
                      {filteredJobs.map((job, index) => (
                        <Draggable
                          key={job.id}
                          draggableId={job.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging 
                                  ? provided.draggableProps.style?.transform 
                                  : "translate(0, 0)"
                              }}
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

                      {filteredJobs.length === 0 && !snapshot.isDraggingOver && (
                        <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                          <p className="text-gray-400 text-xs font-medium">Drop here</p>
                        </div>
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