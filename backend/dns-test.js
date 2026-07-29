const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.tlivwci.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("ERROR:", err);
      return;
    }

    console.log("SUCCESS:");
    console.log(addresses);
  }
);