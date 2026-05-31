export const errorMiddleware = (err: any, _: any, res: any, __: any) => {
  console.log("SV1.1", err);
  res.status(500).json({ error: err.message });
};
