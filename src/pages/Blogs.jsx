import React from "react";
import "../layout/Blogs.css";
import blogImage from "../assets/img/blog-hero.png";
import drupalLogo from "../assets/img/drupal-logo.png";

const Blogs = () => {
  return (
    <div className="news-article">
      <h1 className="article-title">
        Drupal 9 is soon here – the upgrade may be a breeze or a great
        undertaking
      </h1>
      <p className="article-meta">
        4 Min • The Wave – DrupalCon Amsterdam 2019™ / Christian Ziegler / CC
        BY-SA 2.0
      </p>
      <div className="article-image">
        <img src={blogImage} alt="DrupalCon Amsterdam Crowd" />
      </div>
      <div className="article-content">
        <p>
          A new version of the Drupal content management system will be released
          on June 3rd, 2020. You will have to migrate to Drupal 9 by November
          2021. If you are now using Drupal 8.x, it will not be a big hassle, as
          it shares the same migration path as Drupal 8.x. However, those who
          have delayed the upgrade to the latest Drupal 7 and 8 versions will
          cause end security updates after this period.
        </p>
        <div className="article-logo">
          <img src={drupalLogo} alt="Drupal Logo" />
        </div>
        <p>
          Good news first: upgrading will be very swift if you are currently up
          to date on Drupal 8 systems. Exactly nothing will change. The complex
          part lies elsewhere for outdated versions.
        </p>
        <h2>Drupal 8 upgrade easily and without risk</h2>
        <p>
          While the development of many of Drupal's major version upgrades has
          been quite laborious and sometimes risky, requiring a complete rebuild
          from scratch, this time there's no need for heavy lifting if you are
          already up-to-date with the newest version of Drupal 8.x. If you
          haven't, however, you must first switch to the latest minor version.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
