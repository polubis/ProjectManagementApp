import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router';

import AddPictureIcon from '@material-ui/icons/AddPhotoAlternate';
import CloseIcon from '@material-ui/icons/Close';

import { StepHeader, InputField, TextareaField, FieldBase, Button } from 'ui';

import { Form, V } from 'utils';

import { addTechnology, editTechnology } from 'shared/services';
import { Technology } from 'shared/models';

import csx from './TechnologyForm.scss';

const [NAME, DESCRIPTION, PICTURE] = [0, 1, 2];
const CONFIG: Form.Config = [
  { label: 'Name', fns: [V.req] },
  { label: 'Description', fns: [V.req] },
  {
    label: 'Picture',
    fns: [(value) => V.makeResult(value === null, 'This field is required')],
    value: null,
  },
];

const makeConfig = (data?: Technology): Form.Config => {
  if (data) {
    return [
      { ...CONFIG[NAME], value: data.name },
      { ...CONFIG[DESCRIPTION], value: data.description },
      {
        ...CONFIG[PICTURE],
        value: {
          src: data.pictureUrl,
          file: null,
        },
      },
    ];
  }

  return CONFIG;
};

namespace TechnologyForm {
  export interface Props {
    data?: Technology;
    id?: string;
  }
}

const TechnologyForm = ({ data, id }: TechnologyForm.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const [{ dirty, invalid, fields }, change, directChange, submit] = Form.useManager(
    makeConfig(data)
  );

  const pictureRef = useRef<HTMLInputElement>(null);

  const handlePictureClick = useCallback(() => {
    pictureRef.current.click();
  }, []);

  const handlePictureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files.length) {
        directChange(
          [PICTURE],
          [
            {
              file: e.target.files[0],
              src: URL.createObjectURL(e.target.files[0]),
            },
          ]
        );
      }
    },
    [fields]
  );

  const handlePictureDelete = useCallback(() => {
    URL.revokeObjectURL(fields[PICTURE].value.src);
    directChange([PICTURE], [null]);
  }, [fields]);

  const handleSubmit = useCallback(
    async (e: Form.Events.Submit) => {
      if (!submit(e)) {
        setPending(true);

        try {
          if (id === undefined) {
            await addTechnology({
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
              picture: fields[PICTURE].value.file,
            });
          } else {
            await editTechnology(+id, {
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
              picture: fields[PICTURE].value.file,
            });
          }

          history.replace(`/app/admin/dictionaries/technologies?query=${fields[NAME].value}`);

          URL.revokeObjectURL(fields[PICTURE].value.src);
        } catch {
          setPending(false);
        }
      }
    },
    [fields, id]
  );

  return (
    <form className={csx.technologyForm} onSubmit={handleSubmit}>
      <StepHeader
        label={id === undefined ? 'Add technology' : 'Edit technology'}
        description="Fill required fields and submit"
      />

      <InputField
        data-idx={NAME}
        label="Name *"
        placeholder="Technology name..."
        error={dirty ? fields[NAME].error : ''}
        value={fields[NAME].value}
        onChange={change}
      />

      <TextareaField
        data-idx={DESCRIPTION}
        label="Description *"
        error={dirty ? fields[DESCRIPTION].error : ''}
        value={fields[DESCRIPTION].value}
        onChange={change}
        placeholder="Technology description..."
      />

      <FieldBase error={dirty ? fields[PICTURE].error : ''} label="Picture *">
        {fields[PICTURE].value ? (
          <div className={csx.picture}>
            <figure>
              <img src={fields[PICTURE].value.src} />
            </figure>
            <span>{fields[PICTURE].value.file ? fields[PICTURE].value.file.name : ''}</span>
            <Button variant="icon" theme="primaryTransparent" onClick={handlePictureDelete}>
              <CloseIcon />
            </Button>
          </div>
        ) : (
          <Button
            className={csx.addPictureBtn}
            theme="primaryTransparent"
            onClick={handlePictureClick}
          >
            <input
              accept="image/*"
              hidden
              ref={pictureRef}
              type="file"
              onChange={handlePictureChange}
            />
            <AddPictureIcon />
            Click to add picture...
          </Button>
        )}
      </FieldBase>

      <Button disabled={(dirty && invalid) || pending} type="submit" theme="primaryDark">
        SUBMIT
      </Button>
    </form>
  );
};

export default TechnologyForm;
