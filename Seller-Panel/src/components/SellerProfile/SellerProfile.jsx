// src/components/SellerProfile/SellerProfile.js
// code by eth
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Trash2, 
  Pencil,
  Menu,
  Package,        
  ClipboardList,  
  Star           
} from "lucide-react";
import styles from "./SellerProfile.module.css";


// Fix Navbar overlay (later we will fix navbar)
// Product, order,  Customer instead of Rating -- From dashboard Slice
// --- Sidebar Component -- Look what actually is need - tushar---
const Sidebar = ({ isSidebarOpen }) => (
  <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
    <div className={styles.sidebarNav}>
      <a href="#" className={`${styles.navLink} ${styles.activeLink}`}>
        My Profile
      </a>
      <a href="#" className={styles.navLink}>Security</a>
      <a href="#" className={styles.navLink}>Teams</a>
      <a href="#" className={styles.navLink}>Team Member</a>
      <a href="#" className={styles.navLink}>Notifications</a>
      <a href="#" className={styles.navLink}>Billing</a>
      <a href="#" className={styles.navLink}>Data Export</a>
    </div>
    <div className={styles.sidebarFooter}>
      <a href="#" className={styles.deleteLink}>
        <Trash2 size={16} /> Delete Account
      </a>
    </div>
  </nav>
);


const SellerProfile = () => {
  const { profile, loading, error } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const renderInfoField = (label, value) => {
    if (value === undefined || value === null || value === "") return null;
    return (
      <div className={styles.infoField}>
        <label>{label}</label>
        <span>{value}</span>
      </div>
    );
  };
  
  // --- The rest of the component setup is the same ---
  if(loading){return <div className={styles.centeredMessage}>Loading seller data...</div>}if(error){return <div className={`${styles.centeredMessage} ${styles.errorMessage}`}>{error}</div>}if(!profile){return <div className={styles.centeredMessage}>No seller profile found.</div>}
  const seller=profile;const fullName=seller.sellerName||"N/A";const[firstName,...lastName]=fullName.split(" ");const address=seller.businessAddress||{};

  return (
    
    <div className={styles.pageContainer}>
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className={styles.contentArea}>
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <button className={styles.menuButton} onClick={toggleSidebar}><Menu size={24} /></button>
            <h1 className={styles.contentTitle}>My Profile</h1>
            <button className={styles.backButton} onClick={() => navigate("/home")} aria-label="Back to home">
              <ArrowLeft size={16} />
              <span className={styles.backButtonText}>Back to Home</span>
            </button>
          </div>

          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>{seller?.sellerName?.charAt(0).toUpperCase() || "S"}</div>
            <div className={styles.profileInfo}>
              <h2>{seller.sellerName || "Seller Name"}</h2>
              <p className={styles.storeName}>{seller.storeName || "Team Manager"}</p>
            </div>
            <button className={`${styles.editButton} ${styles.headerEditButton}`}><Pencil size={14} /> Edit</button>
          </div>

          {/* --- NEW AMAZING STATS SECTION --- */}
          <div className={styles.profileStats}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconProducts}`}>
                <Package size={22} />
              </div>
              <div className={styles.statInfo}>
                <p>Products</p>
                <h4>{seller?.totalProducts || 0}</h4>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconOrders}`}>
                <ClipboardList size={22} />
              </div>
              <div className={styles.statInfo}>
                <p>Orders</p>
                <h4>{seller?.totalOrders || 0}</h4>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.iconRating}`}>
                <Star size={22} />
              </div>
              <div className={styles.statInfo}>
                <p>Rating</p>
                <h4>{seller?.ratings || 0}</h4>
              </div>
            </div>
          </div>
          {/* --- END OF NEW STATS SECTION --- */}
          
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}><h3>Personal Information</h3><button className={styles.editButton}><Pencil size={14} /> Edit</button></div>
            <div className={styles.infoGrid}>
              {renderInfoField("First Name", firstName)}
              {renderInfoField("Last Name", lastName.join(" "))}
              {renderInfoField("Email address", seller.email)}
              {renderInfoField("Phone", seller.phone)}
              {renderInfoField("Bio", "A brief bio about the seller can go here.")}
            </div>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}><h3>Address</h3><button className={styles.editButton}><Pencil size={14} /> Edit</button></div>
            <div className={styles.infoGrid}>
                {renderInfoField("Country", address.country)}
                {renderInfoField("City/State", `${address.city||''}, ${address.state||''}`)}
                {renderInfoField("Postal Code", address.postalCode)}
                {renderInfoField("TAX ID", seller.gstNumber || "N/A")}
            </div>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}><h3>Banking Details</h3><button className={styles.editButton}><Pencil size={14} /> Edit</button></div>
            {seller.bankDetails?(<div className={styles.infoGrid}>{renderInfoField("Account Holder",seller.bankDetails.accountHolderName)}{renderInfoField("Account Number",seller.bankDetails.accountNumber)}{renderInfoField("IFSC Code",seller.bankDetails.ifscCode)}{renderInfoField("UPI ID",seller.bankDetails.upiId)}</div>):(<p className={styles.noDetails}>No bank details available.</p>)}
          </div>
        </div>
      </main>
    </div>
   
  );
};

export default SellerProfile;