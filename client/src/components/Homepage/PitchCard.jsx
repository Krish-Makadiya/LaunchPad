import { useNavigate } from "react-router-dom";

export const PitchCard = ({ pitch, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this pitch?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                    `https://launch-pad-npps.vercel.app//api/pitches/${pitch._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                onDelete(pitch._id);
            } catch (err) {
                alert("Failed to delete pitch");
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            {/* Existing card content */}
            <div className="flex space-x-2">
                <button
                    onClick={() => navigate(`/pitch/${pitch._id}`)}
                    className="px-4 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90">
                    View Details
                </button>
                <button
                    onClick={() => navigate(`/pitch/edit/${pitch._id}`)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    Delete
                </button>
            </div>
        </div>
    );
};
