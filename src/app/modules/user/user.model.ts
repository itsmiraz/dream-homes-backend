import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is Required'],
    },
    profileImg: {
      type: String,
      default:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/large/default-avatar-profile-icon-of-social-media-user-vector.jpg',
    },

    password: {
      type: String,
      required: [true, 'Password is Required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },

    role: {
      type: String,
      enum: ['admin', 'user', 'seller', 'mod'],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Pre save middleware /hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //document
  // Hashing user password and save to the db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware /hook
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudnetExists = await User.findOne(query);

  if (!isStudnetExists) {
    throw new Error('Student Does not Exist');
  } else {
    next();
  }
});
userSchema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isStudnetExists = await User.findOne(query);

  if (!isStudnetExists) {
    throw new Error('Student Does not Exist');
  } else {
    next();
  }
});
export const User = model<TUser>('User', userSchema);
