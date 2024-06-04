import * as React from "react";
import styles from './css/review.module.css';

const postComment = async (comment) => {
  const response = await fetch("http://teeput.synology.me:40001/api/v1/comment", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      site: 'semi4team',
      text: comment,
      user: {
        id: 'anonymous',
        name: 'Anonymous'
      }
    })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

const Comments = ({ location }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postComment(comment);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const insertScript = (id, parentElement) => {
      const script = window.document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = id;

      let url = window.location.origin + window.location.pathname;
      if (url.endsWith("/")) {
        url = url.slice(0, -1);
      }

      script.innerHTML = `
        var remark_config = {
          host: "http://teeput.synology.me:40001",
          site_id: "semi4team",
          url: "${url}",
          theme: "white",
          components: ["embed"],
          locale: 'ko',
          show_email_subscription: false,
          simple_view: true,
          no_footer: true
        };
        !function(e,n){
          for(var o=0;o<e.length;o++){
            var r=n.createElement("script"),
            c=".js",
            d=n.head||n.body;
            "noModule" in r ? (r.type="module",c=".mjs") : (r.async=!0,r.defer=!0);
            r.src=remark_config.host+"/web/"+e[o]+c;
            d.appendChild(r)
          }
        }(remark_config.components||["embed"],document);
      `;
      parentElement.appendChild(script);
    };

    const removeScript = (id, parentElement) => {
      const script = window.document.getElementById(id);
      if (script) {
        parentElement.removeChild(script);
      }
    };

    const manageScript = () => {
      if (typeof window === "undefined") return;
      const document = window.document;
      if (document.getElementById("remark42")) {
        insertScript("comments-script", document.body);
      }
      return () => removeScript("comments-script", document.body);
    };

    manageScript();

    const recreateRemark42Instance = () => {
      if (typeof window === "undefined") return;
      const remark42 = window.REMARK42;
      if (remark42) {
        remark42.destroy();
        remark42.createInstance(window.remark_config);
      }
    };

    recreateRemark42Instance();
  }, [location]);

  return (
    <div className={styles.container}>
      <h2 className={styles.sub_title}>리뷰</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">댓글 등록</button>
      </form>
      <div id="remark42"></div>
    </div>
  );
};

export default Comments;
