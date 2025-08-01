import React from 'react';
import UserInfo from '~components/UserInfo';

const ContactInfo = ({contact, ...props}) => {
  const user = {
    display_name: contact.name,
    user_email: contact.email,
    user_phone: contact.phone,
    user_description: contact.description,
  };

  return <UserInfo user={user} {...props} />;
};

export default ContactInfo;
