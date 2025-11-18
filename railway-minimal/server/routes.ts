import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";

// Use the schema from shared for consistency
const contactSchema = insertContactSchema;

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Create nodemailer transporter (configure with your email service)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_USER,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.SMTP_USER || process.env.EMAIL_USER || 'contact@vsecurebytes.com',
        to: process.env.CONTACT_EMAIL || 'contact@vsecurebytes.com',
        subject: `New Consultation Request from ${validatedData.company}`,
        html: `
          <h2>New Enterprise Consultation Request</h2>
          <p><strong>Name:</strong> ${validatedData.fullName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Company:</strong> ${validatedData.company}</p>
          <p><strong>Interest Area:</strong> ${validatedData.interest}</p>
          ${validatedData.message ? `<p><strong>Message:</strong><br>${validatedData.message}</p>` : ''}
          <hr>
          <p><em>Sent from vSecureBytes contact form</em></p>
        `,
      };

      // Send confirmation email to user
      const userConfirmationOptions = {
        from: process.env.SMTP_USER || process.env.EMAIL_USER || 'contact@vsecurebytes.com',
        to: validatedData.email,
        subject: 'Thank you for your interest in vSecureBytes',
        html: `
          <h2>Thank you for contacting vSecureBytes</h2>
          <p>Dear ${validatedData.fullName},</p>
          <p>We have received your consultation request for <strong>${validatedData.interest}</strong>.</p>
          <p>Our enterprise team will review your requirements and contact you within 24 hours to schedule a personalized consultation.</p>
          <br>
          <p>Best regards,<br>The vSecureBytes Team</p>
          <hr>
          <p><em>This is an automated confirmation. Please do not reply to this email.</em></p>
        `,
      };

      try {
        // Send both emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(userConfirmationOptions);
        
        res.json({ 
          success: true, 
          message: "Consultation request sent successfully" 
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Still return success to user, but log the error
        res.json({ 
          success: true, 
          message: "Consultation request received successfully" 
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError 
          ? error.errors[0].message 
          : "Failed to process consultation request" 
      });
    }
  });

  return createServer(app);
}
