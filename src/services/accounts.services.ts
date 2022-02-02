import AccountModel from '../models/accounts.models';

// create account
export const createAccount = ({
  email,
  tier,
}: {
  email: string;
  tier: string;
}) => {
  return AccountModel.create({ email, tier });
};

// methods to find account
export const findAccountByEmail = ({ email }: { email: string }) => {
  return AccountModel.findOne({ email });
};

export const findAccountById = (id: string) => {
  return AccountModel.findById(id);
};

// methods to edit accounts
export const findAccountByIdAndUpdate = async ({
  accountId,
  userId,
}: {
  accountId: string;
  userId: string;
}) => {
  return await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $push: { users: userId },
    },
    { new: true }
  );
};
