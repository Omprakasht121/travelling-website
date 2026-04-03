import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTripContext } from "../../context/TripContext";
import { Compass, CalendarDays, GripVertical, Trash2 } from "lucide-react";
import { updateTrip } from "../../shared/services/api-client";
import toast from "react-hot-toast";

export default function TripPlannerPage() {
  const { trips, activeTrip, setActiveTrip, loading, fetchUserTrips } = useTripContext();
  const [localDays, setLocalDays] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserTrips();
  }, [fetchUserTrips]);

  useEffect(() => {
    if (activeTrip) {
      // Sort days and deep copy to state
      const sortedDays = [...activeTrip.days].sort((a, b) => a.dayNumber - b.dayNumber);
      setLocalDays(sortedDays);
    }
  }, [activeTrip]);

  if (loading && !activeTrip) return <div className="p-10 text-center">Loading trips...</div>;

  if (!trips.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Compass className="w-20 h-20 text-orange-500 mb-4 opacity-50" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Trips Planned Yet</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Start exploring Bundelkhand! Click the Calendar icon on any destination or hotel to add it to your itinerary.
        </p>
      </div>
    );
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // source.droppableId is something like "day-1"
    const sourceDayNum = parseInt(source.droppableId.split('-')[1]);
    const destDayNum = parseInt(destination.droppableId.split('-')[1]);

    const daysCopy = JSON.parse(JSON.stringify(localDays)); // deep copy

    const sourceDayIndex = daysCopy.findIndex(d => d.dayNumber === sourceDayNum);
    const destDayIndex = daysCopy.findIndex(d => d.dayNumber === destDayNum);

    const sourceDay = daysCopy[sourceDayIndex];
    const destDay = daysCopy[destDayIndex];

    // Remove from source
    const [movedItem] = sourceDay.locations.splice(source.index, 1);

    // Add to destination
    destDay.locations.splice(destination.index, 0, movedItem);

    setLocalDays(daysCopy);

    // Save to backend immediately
    try {
      setSaving(true);
      const updated = await updateTrip(activeTrip._id, { days: daysCopy });
      setActiveTrip(updated);
      toast.success("Itinerary updated");
    } catch (err) {
      toast.error("Failed to save reorder");
      setLocalDays([...activeTrip.days].sort((a, b) => a.dayNumber - b.dayNumber)); // revert
    } finally {
      setSaving(false);
    }
  };

  const removeLocation = async (dayNumber, locIndex) => {
    const daysCopy = JSON.parse(JSON.stringify(localDays));
    const day = daysCopy.find(d => d.dayNumber === dayNumber);
    day.locations.splice(locIndex, 1);
    setLocalDays(daysCopy);

    try {
      setSaving(true);
      const updated = await updateTrip(activeTrip._id, { days: daysCopy });
      setActiveTrip(updated);
      toast.success("Location removed");
    } catch (err) {
      toast.error("Failed to remove location");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 md:px-8 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar: Trip Selector */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Compass className="text-orange-600" />
            My Trips
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-2">
            {trips.map(trip => (
              <button
                key={trip._id}
                onClick={() => setActiveTrip(trip)}
                className={`w-full text-left px-4 py-3 rounded-xl transition font-medium flex items-center gap-3 ${
                  activeTrip?._id === trip._id 
                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <CalendarDays size={18} />
                {trip.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Drag & Drop Itinerary */}
        <div className="w-full md:w-2/3">
          {activeTrip && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                  {activeTrip.title}
                </h1>
                {saving && <span className="text-sm font-semibold text-orange-500 animate-pulse">Saving...</span>}
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="space-y-8">
                  {localDays.map((day) => (
                    <div key={day.dayNumber} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Day {day.dayNumber}
                      </h3>
                      
                      <Droppable droppableId={`day-${day.dayNumber}`}>
                        {(provided, snapshot) => (
                          <div 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            className={`min-h-[100px] rounded-xl transition-colors ${snapshot.isDraggingOver ? "bg-orange-50 dark:bg-orange-900/10" : ""}`}
                          >
                            {day.locations.length === 0 ? (
                              <p className="text-gray-400 dark:text-gray-600 text-sm text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                                Drag locations here or add them from Explore pages.
                              </p>
                            ) : null}

                            {day.locations.map((loc, index) => (
                              <Draggable key={loc._id} draggableId={loc._id} index={index}>
                                {(provided, snapshot) => {
                                  // Determine display name based on content type
                                  const content = loc.contentId || {};
                                  const title = content.title || content.name || content.hotelName || content.dishName || "Unknown Location";
                                  const imgUrl = content.mainImage?.url || content.image?.url;

                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`mb-3 flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border ${snapshot.isDragging ? "shadow-lg border-orange-400 scale-[1.02]" : "shadow-sm border-gray-100 dark:border-gray-700"} transition-all`}
                                    >
                                      <div className="flex items-center gap-3 w-full">
                                        <div 
                                          {...provided.dragHandleProps} 
                                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-50 dark:bg-gray-900 rounded-md cursor-grab active:cursor-grabbing"
                                        >
                                          <GripVertical size={18} />
                                        </div>
                                        {imgUrl && (
                                          <img src={imgUrl} alt={title} className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                                        )}
                                        <div>
                                          <h4 className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 line-clamp-1">{title}</h4>
                                          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full mt-1 inline-block">
                                            {loc.category}
                                          </span>
                                        </div>
                                      </div>
                                      <button 
                                        onClick={() => removeLocation(day.dayNumber, index)}
                                        className="text-gray-300 hover:text-red-500 transition p-2 ml-2"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
