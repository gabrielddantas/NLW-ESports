import express, { Request, Response } from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import {
  convertHoursStringToMinutes,
  convertMinutesToHoursString,
} from "./utils/convert-hours";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            Ads: true,
          },
        },
      },
    });

    return res.status(200).json(games);
  } catch (error) {
    console.log("Error to fetch all games -> ", error);
    return res.status(500).send("Error getting games");
  }
});

app.post("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const body = req.body;

  try {
    const createdAd = await prisma.ad.create({
      data: {
        ...body,
        gameId,
        weekDays: body.weekDays.join(","),
        hoursStart: convertHoursStringToMinutes(body.hoursStart),
        hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
      },
    });

    return res.status(201).json(createdAd);
  } catch (error) {
    console.log("Error to fetch created a game -> ", error);
    return res.status(500).send("Error to created a game");
  }
});

app.get("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id;

  try {
    const gameAds = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        hoursStart: true,
        hoursEnd: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        weekDays: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(
      gameAds.map((gameAd) => {
        return {
          ...gameAd,
          weekDays: gameAd.weekDays.split(","),
          hoursStart: convertMinutesToHoursString(gameAd.hoursStart),
          hoursEnd: convertMinutesToHoursString(gameAd.hoursEnd),
        };
      })
    );
  } catch (error) {
    console.log("Error to fetch all games ad -> ", error);
    return res.status(500).send("Error getting games ad");
  }
});

app.get("/ads/:id/discord", async (req: Request, res: Response) => {
  const adId = req.params.id;

  try {
    const discord = await prisma.ad.findUniqueOrThrow({
      where: {
        id: adId,
      },
      select: {
        discord: true,
      },
    });

    return res.status(200).json(discord);
  } catch (error) {
    console.log("Error to fetch ad discord -> ", error);
    return res.status(500).send("Error getting discord");
  }
});

app.listen(9000, () => {
  console.log("app is listening on 9000");
});
