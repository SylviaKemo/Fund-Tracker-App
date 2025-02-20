import React, { useState, useEffect } from "react";
import { useCampaignsContext } from "../hooks/useCampaignContext";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";

const CampaignForm = ({ campaign = null, onCancel }) => {
  const { dispatch } = useCampaignsContext();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    category: "Education",
    status: "Active",
    location: "",
    organizer: userId || "",
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
        deadline: campaign.deadline.split("T")[0], // Format date
        category: campaign.category,
        status: campaign.status,
        location: campaign.location,
        organizer: campaign.organizer,
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const method = campaign ? "PUT" : "POST";
    const url = campaign ? `/api/campaign/${campaign._id}` : "/api/campaign";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        if (campaign) {
          dispatch({ type: "UPDATE_CAMPAIGN", payload: result });
        } else {
          dispatch({ type: "CREATE_CAMPAIGN", payload: result });
        }

        setFormData({
          title: "",
          description: "",
          goalAmount: "",
          deadline: "",
          category: "Education",
          status: "Active",
          location: "",
          organizer: userId || "",
        });

        if (onCancel) onCancel();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="campaign-form-container">
        <h2>{campaign ? "Update Campaign" : "Create a Campaign"}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Campaign Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="goalAmount">
            <Form.Label>Goal Amount</Form.Label>
            <Form.Control
              type="number"
              id="goalAmount"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="deadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Education">Education</option>
              <option value="Medical">Medical</option>
              <option value="Non-Profit">Non-Profit</option>
              <option value="Community">Community</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="submit">
            <button type="submit">
              {campaign ? "Update Campaign" : "Create Campaign"}
            </button>
            {campaign && (
              <button
                type="button"
                className="cancel-button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default CampaignForm;
