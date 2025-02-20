import React, { useState, useEffect } from "react";
import { useCampaignsContext } from "../hooks/useCampaignContext";
import CampaignForm from "../forms/CampaignForm";
import DonationForm from "../forms/DonationForm";
import "../styles/campaign.css";
// import "../styles/donation.css";

import { format } from "date-fns";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const CampaignDetails = () => {
  const { dispatch } = useCampaignsContext();
  const { campaigns } = useCampaignsContext();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      try {
        const response = await fetch("/api/campaign", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_CAMPAIGNS", payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCampaigns();
  }, [dispatch]);

  const handleDelete = async (campaignId) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      const response = await fetch(`/api/campaign/${campaignId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        dispatch({ type: "DELETE_CAMPAIGN", payload: campaignId });
      } else {
        console.log("Failed to delete campaign");
      }
    } catch (error) {
      console.log("Error deleting campaign:", error);
    }
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCancel = () => {
    setSelectedCampaign(null);
  };

  return (
    <div className="campaign-details ">
      {/* <h2>Campaigns</h2> */}
      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        <div className="campaign-list">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              {/* 🛠 Action Buttons Container */}
              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(campaign)}
                >
                  <MdOutlineEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(campaign._id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>

              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <p>Goal Amount: {`ksh ${campaign.goalAmount}`}</p>
              <p>Raised Amount: {campaign.raisedAmount}</p>
              <p>
                <strong>Deadline:</strong>{" "}
                {format(new Date(campaign.deadline), "dd/MM/yyyy")}
              </p>
              <p>Category: {campaign.category}</p>
              <p className={`status ${campaign.status.toLowerCase()}`}>
                <strong>Status:</strong> {campaign.status}
              </p>
              {/* Donate Button */}
              <button
                className="donate-btn"
                onClick={() => {
                  setSelectedCampaignId(campaign._id);
                }}
              >
                Donate
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show Donation Form when a campaign is selected */}
      {selectedCampaignId && (
        <DonationForm
          campaignId={selectedCampaignId}
          onClose={() => setSelectedCampaignId(null)}
        />
      )}

      {selectedCampaign && (
        <CampaignForm campaign={selectedCampaign} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default CampaignDetails;
