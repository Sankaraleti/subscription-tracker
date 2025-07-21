import { aj } from "../config/arcjet.config.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    console.log(decision.isAllowed());
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({
          success: false,
          error: "Rate Limit Exceeded",
        });
      if (decision.reason.isBot())
        return res.status(403).json({
          success: false,
          error: "Bot detected",
        });
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }
    next();
  } catch (err) {
    console.log("Arcjet middleware Error: ", err);
    next(err);
  }
};
export default arcjetMiddleware;
