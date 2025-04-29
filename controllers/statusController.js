let latestStatus = null;

exports.updateStatusFromPi = (req, res) => {
  latestStatus = req.body;
  res.status(200).json({ message: "Status updated", received: latestStatus });
};

exports.getPiStatus = (req, res) => {
  if (!latestStatus) {
    return res.status(404).json({ error: "No status available" });
  }
  res.status(200).json(latestStatus);
};
