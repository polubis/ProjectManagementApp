import React, { DetailedHTMLProps, HTMLAttributes, FC, ReactElement } from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Button, Img, More } from 'ui';

import { Palette } from 'styles';

import { Template } from 'shared/models';

import csx from './TemplateTileSmall.scss';

interface Props
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  children?: ReactElement | ReactElement[];
  template: Template;
}

const TemplateTileSmall: FC<Props> = ({ className, children, template, ...props }) => {
  const { name, technologies } = template;

  return (
    <div {...props} className={`${csx.tile} ${className} ${children ? csx.parent : ''}`}>
      <header>
        <span className={csx.title} title={name}>
          {name}
        </span>

        {children && (
          <More
            background={Palette.surface}
            trigger={(open) => (
              <Button
                title="More"
                onClick={(e) => {
                  e.stopPropagation();
                  open(e);
                }}
                theme="primaryTransparent"
                variant="icon"
              >
                <MoreVertIcon />
              </Button>
            )}
          >
            {children}
          </More>
        )}
      </header>

      <footer>
        {technologies.map(({ id, pictureUrl }) => (
          <Img alt="Technology image" key={id} size="32px:32px" src={pictureUrl} />
        ))}
      </footer>
    </div>
  );
};

TemplateTileSmall.defaultProps = {
  className: '',
};

export default TemplateTileSmall;
