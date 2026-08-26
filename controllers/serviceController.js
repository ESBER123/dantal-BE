import prisma from "../config/prisma.js";

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        duration,
      },
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
