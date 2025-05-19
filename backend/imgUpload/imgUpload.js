const imgUpload = (file, folder = "image") => {
  const fileUpload = file.name.split(".")[1];
  console.log(fileUpload, "fileUpload");
  const randomNum = Math.random().toString(36).substring(2);
  const imageName = randomNum + "." + fileUpload;
  console.log(imageName, "image name is ");
  file.mv(`public/${folder}/${imageName}`);

  return imageName;
};

export default imgUpload;
