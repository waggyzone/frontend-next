import { GetServerSideProps, NextPage } from "next";

const Profile: NextPage = () => {
  return <div>Enter</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Profile;
Profile.auth = true;
