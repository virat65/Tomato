import { tokenGen } from "../Jwt/userToken.js";
import userModel from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import imgUpload from "../imgUpload/imgUpload.js";

//signup api

export const signUP = async (req, res) => {
  try {
    const emailFind = await userModel.findOne({ email: req.body.email });
    console.log(emailFind, "Email finded");

    if (emailFind) {
      return res.json({
        status: 400,
        success: false,
        message: "Email already exist",
        body: {},
      });
    } else {
      console.log(req.files);
      if (req.files && req.files.image.name) {
        const photo = req.files.image;
        console.log(`${photo}photo call`);
        console.log(`inside the photo call`);
        if (photo) {
          req.body.image = imgUpload(photo, "image");
        }
      }

      const passwordEnc = await bcrypt.hash(req.body.password, 10);
      console.log(passwordEnc, "password");

      const data = await userModel.create({
        ...req.body,
        password: passwordEnc,
        image: req.body.image,
      });
      console.log(data, "User created");

      // Jwt token

      const tokenCall = await tokenGen(data._id);
      console.log(tokenCall, "tokencall");
      data.token = await tokenCall.tokenn;
      data.loginTime = tokenCall.verify.iat;
      data.save();

      //token end

      return res.json({
        status: 200,
        success: true,
        message: "User created",
        body: data,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};
//signup end

//login start
export const logIn = async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.email });
    console.log(data, "Data");

    if (!data) {
      return res.json({
        status: 400,
        success: false,
        message: "email doesn't exist",
        body: {},
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      data.password
    );
    console.log(passwordMatch, "password is matched");

    // Jwt token

    const tokenCall = await tokenGen(data._id);
    console.log(tokenCall, "tokencall");
    data.token = await tokenCall.tokenn;
    data.loginTime = tokenCall.verify.iat;
    data.save();

    //token end

    if (!passwordMatch) {
      return res.json({
        status: 400,
        success: false,
        message: "Wrong password",
        body: data,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        message: "login successfull",
        body: data,
      });
    }
  } catch (error) {
    console.log(error, "Error in login");
  }
};
//login end

//find All

export const findAll = async (req, res) => {
  try {
    const data = await userModel.find();
    console.log(data, "data");

    return res.json({
      body: data,
    });
  } catch (error) {
    console.log(error, "error in Find");
  }
};

//end

// find by id

export const findId = async (req, res) => {
  try {
    const byId = await userModel.findById({ _id: req.params.id });
    console.log(byId, "data");
    return res.json({
      body: byId,
    });
  } catch (error) {
    console.log(error, "error in find");
  }
};

//delete api

export const deleteId = async (req, res) => {
  try {
    const del = await userModel.deleteOne({ _id: req.params.id });
    return res.json({
      sucess: true,
      status: 200,
      message: "User deleted",
      body: { del },
    });
  } catch (error) {
    console.log(error, "error");
  }
};
