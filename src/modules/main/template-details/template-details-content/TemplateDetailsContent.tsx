import React, { FC, useMemo } from 'react';

import { Img, Tags } from 'ui';

import { convertDate } from 'utils';

import { Template } from 'shared/models';
import { TemplateStats, TemplateTags, TechnologyChip } from 'shared/components';

import csx from './TemplateDetailsContent.scss';

namespace TemplateDetailsContent {
  export interface Props {
    template: Template;
  }
}

const TemplateDetailsContent: FC<TemplateDetailsContent.Props> = ({ template }) => {
  const {
    patterns,
    technologies,
    watches,
    stars,
    createdDate,
    modifiedDate,
    description,
    contributors,
    name,
  } = template;

  const patternsNames = useMemo(() => patterns.map(({ name }) => name), [patterns]);

  return (
    <div className={csx.templateDetailsContent}>
      <TemplateTags className={csx.tags} items={template.tags} />

      <TemplateStats
        patterns={patterns.length}
        stars={stars}
        technologies={technologies.length}
        watches={watches}
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

      <div className={csx.contributors}>
        <h5>Authors</h5>

        <div>
          {contributors.map((contributor) => (
            <a
              target="_blank"
              rel="noreferrer"
              key={contributor.name}
              href={`https://github.com/${contributor.name}`}
              title={contributor.name}
            >
              <Img className={csx.contributorAvatar} size="50px:50px" src={contributor.avatarUrl}>
                {contributor.name.charAt(0)}
              </Img>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsContent;
