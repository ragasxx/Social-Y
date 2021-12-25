const nodemailer = require("../config/nodemailer");

// another way to export a method

exports.newComment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "sagarbhatia722@gmail.com",
      to: comment.user.email,
      subject: "You just published a comment",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in sending email", err);
        return;
      }

      console.log("message sent ", info);
      return;
    }
  );
};
