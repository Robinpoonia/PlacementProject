function validateScholar(scholarNo) {
    return /^\d{11}$/.test(scholarNo);
}

// function validateScholar(scholarNo) {
//     const scholar = Number(scholarNo);

//     return (
//         (scholar >= 25204031101 && scholar <= 252040311157) ||
//         (scholar >= 25204031201 && scholar <= 25204031257)
//     );
// }

module.exports = validateScholar;