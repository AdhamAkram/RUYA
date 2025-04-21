// const sosAlerts = []; // Temporary storage for SOS alerts

// exports.triggerSOS = (req, res) => {
//     const { deviceId, userId } = req.body;

//     if (!deviceId || !userId) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     const sosAlert = {
//         sosId: sosAlerts.length + 1,
//         deviceId,
//         userId,
//         timestamp: new Date().toISOString(),
//         status: "active"
//     };

//     sosAlerts.push(sosAlert);

//     // Simulate sending SOS alert (e.g., notify emergency contacts)
//     console.log(`🚨 SOS triggered by user ${userId} from device ${deviceId}`);

//     res.status(200).json({
//         message: "SOS alert triggered successfully",
//         status: "active",
//         sosId: sosAlert.sosId
//     });
// };
