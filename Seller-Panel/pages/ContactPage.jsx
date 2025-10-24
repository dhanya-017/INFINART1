import React from 'react';
import Layout from '../src/components/Layouts/Layout';
import { Button, TextField, Typography } from '@mui/material';
import './seller-support/SellerSupportPage.css';

const ContactPage = () => {
  return (
    <Layout>
      <div className="seller-support-page">
        <div className="support-header">
          <h1>Contact Us</h1>
        </div>
        <div className="support-content">
          <Typography variant="body1" gutterBottom>
            Have a question or need help? Fill out the form below and our team will get back to you as soon as possible.
          </Typography>
          <form noValidate autoComplete="off">
            <TextField label="Your Name" variant="outlined" fullWidth margin="normal" />
            <TextField label="Your Email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Subject" variant="outlined" fullWidth margin="normal" />
            <TextField label="Message" variant="outlined" fullWidth margin="normal" multiline rows={4} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
