import React, { useState } from "react";
import img1 from "../Img/gift1.png";
import img2 from "../Img/gift2.png";
import copy from "../Img/copy.png";
import Button from "./Button";
import Invite from "../Img/invite.webp";
import "../Styles/Friends.css";
function Friend() {
  const [showPopup, setShowPopup] = useState(false);

  const handleInviteClick = () => {
    setShowPopup(true);
  };

  const handleShareClick = () => {
    // Logic to open social media apps for sharing
    // Since we're emulating a Telegram bot, you might use deep linking or any API provided by Telegram
    window.open("tg://msg?text=Your referral link here");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText("Your referral link here");
    alert("Referral link copied!");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 z-10">
              <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                <div className="px-4 py-2 items-center space-x-2">
                  <h1
                    className="px-4 py-2 items-center space-x-2"
                    style={{ fontSize: 40, textAlign: "center" }}
                  >
                    {" "}
                    Invite friends!
                  </h1>
                </div>
                <div className="px-4 py-2 items-center space-x-2">
                  <p style={{ textAlign: "center" }}>
                    You and your friend will receive bonuses
                  </p>
                </div>
                <hr />
                <div className="invite-container">
                  <div className="invite-header">
                    <h1>App Name</h1>
                    <div role="img" aria-label="friends">
                      <img src={Invite} alt="" style={{ width: 227 }} />
                    </div>
                    <h2>Invite frens. Earn Money</h2>
                  </div>
                  <div className="invite-steps">
                    <p>Share your invitation link</p>
                    <p>Your friends join Blum</p>
                    <p>And start farming points</p>
                    <p>Score 10% from buddies</p>
                    <p>Plus an extra 2.5% from their referrals</p>
                  </div>
                  <button className="invite-button" onClick={handleInviteClick}>
                    Invite a friends
                  </button>

                  {showPopup && (
                    <div className="popup">
                      <div className="popup-content">
                        <button
                          className="share-button"
                          onClick={handleShareClick}
                        >
                          Share
                        </button>
                        <button
                          className="copy-button"
                          onClick={handleCopyClick}
                        >
                          Copy Link
                        </button>
                        <button className="close-popup" onClick={closePopup}>
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friend;
