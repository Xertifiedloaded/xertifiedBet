const Landing = async (req, res) => {
    res.send("Wrap it up Nigga!!!!😁😁😁");
  };
  


const  NotFound=(req,res)=> {
  res.send("Route NOT FOUND");
}

// const limiter = rateLimit({
//   windowMs: 10 * 1000,
//   max: 20,
//   message: "Too many requests from this IP, please try again later.",
//   keyGenerator: function (req, res) {
//     return req.headers.authorization || req.ip;
//   },
// });

export {Landing,NotFound}