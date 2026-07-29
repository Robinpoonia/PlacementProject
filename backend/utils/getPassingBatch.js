function getPassingBatch(scholarNumber) {
  if (!scholarNumber) return null;

  const admissionYY = parseInt(
    scholarNumber.toString().substring(0, 2),
    10
  );

  if (isNaN(admissionYY)) return null;

  return 2000 + admissionYY + 3;
}

module.exports = getPassingBatch;