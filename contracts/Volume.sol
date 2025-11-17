// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Volume calculator
/// @notice Calcul purement mathématique — prend des dimensions (en millimètres) et renvoie :
/// - volume en mm^3
/// - volume en m^3 sous forme "scaled" (18 décimales)
contract Volume {
    uint256 public lastVolumeMm3;
    uint256 public lastVolumeM3Scaled; // valeur mise à l'échelle (18 décimales)

    /// @notice Calcule le volume (pure function)
    /// @param lengthMm longueur en millimètres
    /// @param widthMm largeur en millimètres
    /// @param heightMm hauteur en millimètres
    /// @return volumeMm3 volume en millimètres cubes
    /// @return volumeM3Scaled volume en mètres cubes mis à l'échelle (18 décimales)
    function computeVolume(uint256 lengthMm, uint256 widthMm, uint256 heightMm) public pure returns (uint256 volumeMm3, uint256 volumeM3Scaled) {
        // calcul en mm^3 : l * w * h
        volumeMm3 = lengthMm * widthMm * heightMm;
        // 1 m^3 = (1000 mm)^3 = 1_000_000_000 mm^3 = 1e9 mm^3
        // Pour retourner un value fixe avec 18 décimales, on fait : volumeMm3 * 1e18 / 1e9 = volumeMm3 * 1e9
        volumeM3Scaled = volumeMm3 * 1e9;
        return (volumeMm3, volumeM3Scaled);
    }

    /// @notice Calcule et stocke le dernier volume
    function computeAndStore(uint256 lengthMm, uint256 widthMm, uint256 heightMm) public returns (uint256, uint256) {
        (uint256 vmm3, uint256 vm3s) = computeVolume(lengthMm, widthMm, heightMm);
        lastVolumeMm3 = vmm3;
        lastVolumeM3Scaled = vm3s;
        return (vmm3, vm3s);
    }
}
