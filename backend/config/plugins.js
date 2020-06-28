module.exports = ({ env }) => ({
  // upload: {
  //   provider: "aws-s3",
  //   providerOptions: {
  //     accessKeyId: env("AWS_ACCESS_KEY_ID"),
  //     secretAccessKey: env("AWS_ACCESS_SECRET"),
  //     region: env("AWS_REGION"),
  //     params: {
  //       Bucket: env("AWS_BUCKET"),
  //     },
  //   },
  // },
  // upload: {
  //   provider: "imagekit",
  //   providerOptions: {
  //     publicKey: "publicKey", // put your publicKey here
  //     privateKey: "privateKey", // put your privateKey here
  //     urlEndpoint: "urlEndPoint", // put your urlEndpoint
  //     params: {
  //       // optional section
  //       folder: "/production/images", // folder location in imagekit.  Defaults to "/" if value is not supplied
  //     },
  //   },
  // },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
