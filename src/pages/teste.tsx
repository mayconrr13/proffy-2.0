/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { storage } from '../services/firebase';

export const Teste = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const avatarInput = register('avatar', { required: true });

  const [localURL, setLocalURL] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  function handleImagePreview(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      setLocalURL('');
      return;
    }

    setLocalURL(URL.createObjectURL(e.target.files[0]));
  }

  async function submitted(data: any) {
    console.log(data.avatar);

    try {
      if (userAvatar !== '') {
        await storage.refFromURL(userAvatar).delete();
      }

      const fileRef = storage.ref().child(data.avatar[0].name);
      await fileRef.put(data.avatar[0]);

      const avatarURL = await fileRef.getDownloadURL();
      setUserAvatar(avatarURL);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={handleSubmit(submitted)}>
        <label htmlFor="avatar">
          <input
            type="file"
            id="avatar"
            ref={avatarInput.ref}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              avatarInput.onChange(e); // method from hook form register
              handleImagePreview(e); // your method
            }}
            name="avatar"
            style={{
              display: 'none',
            }}
          />
          +
        </label>

        {!localURL && !userAvatar ? (
          <span
            style={{
              display: 'block',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: 'tomato',
              textAlign: 'center',
              lineHeight: '200px',
              fontSize: '80px',
            }}
          >
            MR
          </span>
        ) : (
          <img
            src={localURL === '' ? userAvatar : localURL}
            alt="Avatar"
            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
          />
        )}

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
