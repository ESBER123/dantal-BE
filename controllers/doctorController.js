import prisma from "../config/prisma.js";
import fs from "fs";
import path from "path";

export const createDoctor = async (req, res) => {
  try {
    const { name, specialty, description, phone, email, isAvailable } =
      req.body;
    const available = isAvailable === "true" || isAvailable === true;
    const image = req.file ? req.file.filename : "";
    console.log("Create Doctor Data:", {
      name,
      specialty,
      description,
      phone,
      email,
      isAvailable,
      available,
      image,
    });
    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialty,
        image,
        description,
        phone,
        email,
        isAvailable: available,
      },
    });
    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    console.error("CREATE DOCTOR ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};
export const getDoctorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid doctor ID",
      });
    }
    const doctor = await prisma.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    res.json(doctor);
  } catch (error) {
    console.error("GET DOCTOR ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const updateDoctor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid doctor ID",
      });
    }
    const { name, specialty, description, phone, email, isAvailable } =
      req.body;
    const foundDoctor = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!foundDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    let image = foundDoctor.image;
    if (req.file) {
      if (foundDoctor.image) {
        const oldImage = path.join("upload", "doctor", foundDoctor.image);
        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }
      image = req.file.filename;
    }
    const available = isAvailable === "true" || isAvailable === true;
    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        name,
        specialty,
        image,
        description,
        phone,
        email,
        isAvailable: available,
      },
    });
    res.json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("UPDATE DOCTOR ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const deleteDoctor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid doctor ID",
      });
    }
    const foundDoctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointments: true,
          },
        },
      },
    });
    if (!foundDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    if (foundDoctor._count.appointments > 0) {
      return res.status(409).json({
        message: "Cannot delete this doctor because they have appointments.",
        appointmentsCount: foundDoctor._count.appointments,
      });
    }
    if (foundDoctor.image) {
      const imagePath = path.join("upload", "doctor", foundDoctor.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await prisma.doctor.delete({
      where: { id },
    });
    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("DELETE DOCTOR ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
