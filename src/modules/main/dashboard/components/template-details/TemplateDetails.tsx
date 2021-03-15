import React, { FC, useMemo } from 'react';

import { Tags, Button } from 'ui';

import { convertDate } from 'utils';

import { Template } from 'shared/models';
import { TemplateTags, TemplateStats, TechnologyChip } from 'shared/components';

import csx from './TemplateDetails.scss';

namespace TemplateDetails {
  export interface Props {
    template: Template;
    onSeeDetailsClick(): void;
    onShowOtherClick(): void;
  }
}

const TemplateDetails: FC<TemplateDetails.Props> = ({
  template,
  onSeeDetailsClick,
  onShowOtherClick,
}) => {
  const {
    stars,
    watches,
    tags,
    technologies,
    patterns,
    createdDate,
    modifiedDate,
    description,
    name,
  } = template;

  const patternsNames = useMemo(() => patterns.map(({ name }) => name), [patterns]);

  return (
    <div className={csx.templateDetails}>
      <TemplateTags items={tags} />

      <TemplateStats
        stars={stars}
        watches={watches}
        technologies={technologies.length}
        patterns={patterns.length}
      />

      <p className={csx.date}>
        Created <span>{convertDate(createdDate)}</span>
        {!!template.modifiedDate && (
          <>
            {' '}
            and modified <span>{convertDate(modifiedDate)}</span>
          </>
        )}
      </p>

      <h1 className={csx.name}>{name}</h1>

      <span className={csx.description}>{description}</span>

      <div className={csx.technologies}>
        <h5>Technologies</h5>

        <div>
          {technologies.map((technology) => (
            <TechnologyChip
              key={technology.id}
              name={technology.name}
              url={technology.pictureUrl}
            />
          ))}
        </div>
      </div>

      <div className={csx.patterns}>
        <h5>Patterns</h5>

        <Tags items={patternsNames} />
      </div>

      <footer>
        <Button onClick={onShowOtherClick}>SHOW OTHER</Button>
        <Button onClick={onSeeDetailsClick}>SEE DETAILS</Button>
      </footer>
    </div>
  );
};

export default TemplateDetails;
