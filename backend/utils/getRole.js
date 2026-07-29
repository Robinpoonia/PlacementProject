function getRoleFromScholar(scholarNo) {
    const batchYear = Number(`20${scholarNo.slice(0, 2)}`);

    const now = new Date();

    let currentBatch = now.getFullYear();

    // Before July, the new batch hasn't joined yet
    if (now.getMonth() < 6) {
        currentBatch--;
    }

    if (batchYear === currentBatch) return "junior";
    if (batchYear === currentBatch - 1) return "senior";
    if (batchYear === currentBatch - 2) return "boss";

    return "alumni";
}

module.exports = getRoleFromScholar;