import React from 'react'
import defaultImageSrc from "../../assets/defaultPicture.jpg"

const Avatar = ({ children,
  borderRadius,
  py,
  px,
  cursor,
  margin,
  imageSrc
}) => {

  const styles = {
    position: 'relative',
    margin: margin,
    borderRadius,
    padding: `${py} ${px}`,
    cursor: cursor || null,
    overflow: 'hidden', // Hide any overflowing content
    display: 'inline-block' // Ensure the div doesn't expand beyond its content
  }


  const imgStyles = {
    position: 'absolute', // Position the image absolutely within the div
    top: '0',
    left: '0',
    width: '100%', // Make the image fill the entire width of the div
    height: '100%', // Make the image fill the entire height of the div
    objectFit: 'cover' // Ensure the image covers the entire space without distortion
  };
  return (
    <div style={styles}>
      {imageSrc ? (
        <img style={imgStyles} src={imageSrc} alt="Avatar" />
      ) : (
        <img style={imgStyles} src={defaultImageSrc} alt="Avatar" />
      )}
      {children}
    </div>
  )
}

export default Avatar