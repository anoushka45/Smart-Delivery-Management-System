import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios'; // Adjust the path as needed

interface PartnerData {
  _id: string; // Add _id to the PartnerData interface for MongoDB documents
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  currentLoad: number;
  areas: string[];
  shift: { start: string; end: string };
  metrics: { rating: number; completedOrders: number; cancelledOrders: number };
}

const Partners: React.FC = () => {
  const [partnerData, setPartnerData] = useState<PartnerData[]>([]); // State to store partners
  const [newPartner, setNewPartner] = useState<PartnerData>({
    _id: "", // New partner will not have an _id initially
    name: "",
    email: "",
    phone: "",
    status: "active",
    currentLoad: 0,
    areas: [],
    shift: { start: "", end: "" },
    metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
  });

  const [areas, setAreas] = useState<string>(""); // New field for areas input

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get('/partners'); // Using axiosInstance
        console.log("Fetched partner data:", response.data); // Log the response data
        setPartnerData(response.data); // Update state with fetched data (array of partners)
      } catch (error) {
        console.error("Error fetching partner data:", error); // Log the error
      }
    };

    fetchPartners();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handling updates for shift and metrics objects separately
    if (name === "shiftStart" || name === "shiftEnd") {
      setNewPartner(prevState => ({
        ...prevState,
        shift: {
          ...prevState.shift,
          [name === "shiftStart" ? "start" : "end"]: value,
        },
      }));
    } else if (name === "rating" || name === "completedOrders" || name === "cancelledOrders") {
      setNewPartner(prevState => ({
        ...prevState,
        metrics: {
          ...prevState.metrics,
          [name]: parseInt(value),
        },
      }));
    } else {
      setNewPartner(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const areasArray = areas.split(',').map(area => area.trim()); // Convert areas string into an array
      const partnerToAdd = { ...newPartner, areas: areasArray };
      
      const response = await axiosInstance.post('/partners', partnerToAdd); // POST request to backend
      console.log("New partner added:", response.data); // Log the added partner data

      // Add the new partner to the list of partners (optimistic UI update)
      setPartnerData(prevState => [...prevState, response.data]);

      // Reset form fields
      setNewPartner({
        _id: "", // Resetting the _id
        name: "",
        email: "",
        phone: "",
        status: "active",
        currentLoad: 0,
        areas: [],
        shift: { start: "", end: "" },
        metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
      });
      setAreas(""); // Reset areas input
    } catch (error) {
      console.error("Error adding partner:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/partners/${id}`); // DELETE request to backend
      console.log("Partner deleted:", response.data); // Log the deletion response

      // Remove the deleted partner from the list (optimistic UI update)
      setPartnerData(prevState => prevState.filter(partner => partner._id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Partners List</h2>
      {/* Display the list of partners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerData.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">No partners found.</p>
        ) : (
          partnerData.map((partner, index) => (
            <div key={partner._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">{partner.name}</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>Email:</strong> {partner.email}</p>
                <p><strong>Phone:</strong> {partner.phone}</p>
                <p><strong>Status:</strong> {partner.status}</p>
                <p><strong>Current Load:</strong> {partner.currentLoad}</p>
                <p><strong>Areas:</strong> {partner.areas.join(', ')}</p>
                <p><strong>Shift:</strong> {partner.shift.start} to {partner.shift.end}</p>
                <p><strong>Rating:</strong> {partner.metrics.rating}</p>
                <p><strong>Completed Orders:</strong> {partner.metrics.completedOrders}</p>
                <p><strong>Cancelled Orders:</strong> {partner.metrics.cancelledOrders}</p>
              </div>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(partner._id)}
                className="bg-red-500 text-white p-2 rounded mt-4"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Form to add a new partner */}
      <h3 className="text-xl font-bold mt-8">Add New Partner</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Form fields for adding a new partner */}
        <div className="space-y-2">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={newPartner.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={newPartner.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Phone</label>
          <input
            type="text"
            name="phone"
            value={newPartner.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Status</label>
          <select
            name="status"
            value={newPartner.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block">Current Load</label>
          <input
            type="number"
            name="currentLoad"
            value={newPartner.currentLoad}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Areas</label>
          <input
            type="text"
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter areas separated by commas"
          />
        </div>
        <div className="space-y-2">
          <label className="block">Shift</label>
          <div className="flex space-x-2">
            <input
              type="time"
              name="shiftStart"
              value={newPartner.shift.start}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="time"
              name="shiftEnd"
              value={newPartner.shift.end}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block">Rating</label>
          <input
            type="number"
            name="rating"
            value={newPartner.metrics.rating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Completed Orders</label>
          <input
            type="number"
            name="completedOrders"
            value={newPartner.metrics.completedOrders}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block">Cancelled Orders</label>
          <input
            type="number"
            name="cancelledOrders"
            value={newPartner.metrics.cancelledOrders}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded mt-4 w-full">
          Add Partner
        </button>
      </form>
    </div>
  );
};

export default Partners;
