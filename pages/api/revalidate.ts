import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const body = req.body;
    body.paths.map(async (path: string) => {
      await res.revalidate(path);
    });

    return res.json({
      revalidated: true,
      paths: (body.paths as string[]).join(","),
    });
  } else {
    return res.json({
      revalidated: false,
      paths: "No method was found",
    });
  }
}
