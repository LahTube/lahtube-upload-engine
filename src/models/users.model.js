const db = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const users = db.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    ip_address: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    email_code: {
      type: DataTypes.STRING,
    },
    device_id: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    about: {
      type: DataTypes.TEXT,
    },
    google: {
      type: DataTypes.STRING,
    },
    facebook: {
      type: DataTypes.STRING,
    },
    twitter: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.INTEGER,
    },
    admin: {
      type: DataTypes.INTEGER,
    },
    verified: {
      type: DataTypes.INTEGER,
    },
    last_active: {
      type: DataTypes.INTEGER,
    },
    registered: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.INTEGER,
    },
    is_pro: {
      type: DataTypes.INTEGER,
    },
    imports: {
      type: DataTypes.INTEGER,
    },
    uploads: {
      type: DataTypes.INTEGER,
    },
    wallet: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.STRING,
    },
    video_mon: {
      type: DataTypes.INTEGER,
    },
    age_changed: {
      type: DataTypes.INTEGER,
    },
    donation_paypal_email: {
      type: DataTypes.STRING,
    },
    user_upload_limit: {
      type: DataTypes.STRING,
    },
    two_factor: {
      type: DataTypes.INTEGER,
    },
    last_month: {
      type: DataTypes.STRING,
    },
    active_time: {
      type: DataTypes.INTEGER,
    },
    active_expire: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    subscriber_price: {
      type: DataTypes.STRING,
    },
    monetization: {
      type: DataTypes.INTEGER,
    },
    new_email: {
      type: DataTypes.STRING,
    },
    fav_category: {
      type: DataTypes.STRING,
    },
    total_ads: {
      type: DataTypes.INTEGER,
    },
    suspend_upload: {
      type: DataTypes.INTEGER,
    },
    suspend_import: {
      type: DataTypes.INTEGER,
    },
    paystack_ref: {
      type: DataTypes.STRING,
    },
    conversationId: {
      type: DataTypes.STRING,
      field: "conversationid",
    },
    point_day_expire: {
      type: DataTypes.INTEGER,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    daily_points: {
      type: DataTypes.INTEGER,
    },
    converted_points: {
      type: DataTypes.INTEGER,
    },
    info_file: {
      type: DataTypes.STRING,
    },
    google_tracking_code: {
      type: DataTypes.STRING,
    },
    newsletters: {
      type: DataTypes.INTEGER,
    },
    vk: {
      type: DataTypes.STRING,
    },
    qq: {
      type: DataTypes.STRING,
    },
    wechat: {
      type: DataTypes.STRING,
    },
    discord: {
      type: DataTypes.STRING,
    },
    mailru: {
      type: DataTypes.STRING,
    },
    linkedIn: {
      type: DataTypes.STRING,
      field: "linkedin",
    },
    pause_history: {
      type: DataTypes.INTEGER,
    },
    tv_code: {
      type: DataTypes.STRING,
    },
    permission: {
      type: DataTypes.TEXT,
    },
    apple: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.STRING,
    },
    market_permission: {
      type: DataTypes.STRING(180),
      defaultValue: "2",
    },
    shop_id: {
      type: DataTypes.BIGINT,
      defaultValue: null,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.INTEGER,
    },
    signin_method: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = users;
