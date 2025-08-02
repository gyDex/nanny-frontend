import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { useAnketsBabysitter } from "@/entities/stores/useAnketsBabysitter";
import { useState } from 'react';
import TextEditor from '@/shared/compontents/TextEditor/TextEditor';
import FileUploadBox from '@/shared/compontents/FileUploadBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import z from 'zod';
import { useMobileState } from '@/entities/stores/useMobileModal';
import { editData } from '@/shared/api/nannyApi';
import { useAuth } from '@/entities/stores/useAuth';

const schema = z.object({
  about: z.any(), // we validate manually in the component
});

const ProfileEditElevenStage = () => {
  const stage = useEditBabysitterStage();

  const mobileState = useMobileState();

  const { setAbout, about, education, age, ageBabysitter, description, jobs, name,
    occupation, question, typePay, duties, count, 
  } = useAnketsBabysitter();

    const {
    control,
    handleSubmit,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      about: EditorState.createEmpty(),
    },
  });

  const {user} = useAuth();

  const [errorsText, setErrors] = useState('');

  const onSubmit = async () => {
    const valid = await trigger('about');
    if (!valid) {
      setErrors('Поле обязательно для заполнения')
      return;
    }; 
    
    const text = about;
    if (!text) {
      setErrors('Поле обязательно для заполнения')
      return;
    }

    setAbout(text);

    const result = {
      about: about,
      education: education,
      jobs: jobs,
      occupancy: '',
      experience: count.toString(),
      agesBaby: [...ageBabysitter],
      duties: [...duties],
      advantages: [...duties],
    }

    await editData(user.id, result);

    console.log('Submitted:', text);
    stage.setStage('final')
  };

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 12/12</span>
      </div>

      <h2 style={{
        marginBottom: '0px'
      }} className={styles['profile-edit-stage__title']}>Расскажите о себе</h2>

      <div className='flex gap-[24px] w-full  max-[768px]:flex-col'>
        <div className='w-full mt-[25px]'>
            <span onClick={() => mobileState.setOpen(true,'form_babysitter')} className='font-normal text-[#7C8092] cursor-pointer text-[16px] underline leading-[26px] block mb-[16px]'>
                Посмотреть, как заполнили другие няни
            </span>
            <TextEditor  OnChangeText={setAbout} valueText={about}     name='about'      control={control} description={<>
                Ваши хобби и ценности ... <br />
Почему вы выбрали профессию няни и что вам в ней нравится? <br />
Какие игры, занятия или методики развития вы обычно предлагаете детям?
                </>} />

                {errorsText !== '' && (
                  <p className="font-[onest] text-red-600 text-sm mt-1">{errorsText}</p>
                )}
        </div>
        <div  className='w-full min-[768px]:max-w-[239px]'>
            <span className='font-[onest] max-[768px]:hidden font-semibold text-[16px] leading-[26px] block mb-[16px]'>
                Загрузить <br /> фотографию
            </span>
            <FileUploadBox title='Загрузите фотографию' types='JPEG, PNG' className={'!min-h-[130px]'} text={<>
              Перетяните или <br /> <span className="text-[#431DED]">загрузите</span> файлы

            </>} description='JPEG, PNG, PDF'/>
        </div>
        <div  className='w-full min-[768px]:max-w-[239px]'>
            <span className='font-[onest] max-[768px]:hidden font-semibold text-[16px] leading-[26px] block mb-[16px]'>
                Загрузите голосовое <br /> или видео о себе 
            </span>
            <FileUploadBox title='Загрузите голосовое или видео о себе ' types='MP3, MP4, WAV, OGG' className={'!min-h-[130px]'} text={<>
              Перетяните или <br /> <span className="text-[#431DED]">загрузите</span> файлы

            </>} description='JPEG, PNG, PDF'/>
        </div>
      </div>


      <div className={styles['profile-edit-stage__bottom']}>
        <button onClick={() => stage.setStage('eleven')} className={styles['profile-edit-stage__btn-bottom_prev']}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Назад
        </button>

        <button onClick={handleSubmit(onSubmit)} className={styles['profile-edit-stage__btn-bottom']}>
          Продолжить
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.33273 8H13.5527" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  )
}

export default ProfileEditElevenStage
