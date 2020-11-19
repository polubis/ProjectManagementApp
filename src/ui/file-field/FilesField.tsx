import React from 'react';
import {
  Observable, from, Subject, Subscription,
} from 'rxjs';
import {
  mergeMap, toArray, tap, switchMap,
} from 'rxjs/operators';

import { FieldBase } from '..';

import csx from './FilesField.scss';

namespace FilesField {
  export interface LoadedFile {
    error?: string;
    file: File;
    src: string;
  }

  export interface Props {
    accept?: string;
    className?: string;
    error?: string;
    label?: string;
    formats: string;
    multiple?: boolean;
    value: LoadedFile[];
    onChange(files: LoadedFile[]): void;
  }
}

// TODO: Add support for other file types if needed
class FilesField extends React.Component<FilesField.Props, unknown> {
  private _filesAdded = new Subject<File[]>();

  private _filesAdded$ = this._filesAdded.asObservable();

  private _subs = new Subscription();

  readonly ref = React.createRef<HTMLInputElement>();

  private _loadFile = (file: File): Observable<FilesField.LoadedFile> => new Observable((subscriber) => {
    const image = new Image();
    const src = URL.createObjectURL(file);

    image.onload = () => {
      subscriber.next({ file, src });
      subscriber.complete();
    };
    image.onerror = () => {
      subscriber.next({ error: 'Error occured', file, src });
    };
    image.src = src;
  });

  open = () => {
    this.ref.current.click();
  };

  private _handleFilesAdd = () => this._filesAdded$
    .pipe(
      switchMap((files) => from(files).pipe(mergeMap(this._loadFile), toArray(), tap(this.props.onChange))),
    )
    .subscribe();

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._filesAdded.next(Array.from(e.target.files));
  };

  handleDelete = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    const clickedSrc = e.currentTarget.getAttribute('src');
    const newValue = this.props.value.filter(({ src }) => src !== clickedSrc);

    this.props.onChange(newValue);
  };

  componentDidMount() {
    this._subs.add(this._handleFilesAdd());
  }

  componentWillUnmount() {
    this._subs.unsubscribe();
  }

  render = () => {
    const {
      accept, className, error, label, formats, multiple, value,
    } = this.props;

    return (
      <FieldBase className={className} error={error} label={label}>
        <div className={csx.filesField} onClick={this.open}>
          {value.length ? (
            <div className={csx.files}>
              {value.map(({ src }) => (
                <img key={src} src={src} onClick={this.handleDelete} />
              ))}
            </div>
          ) : (
            <>
              <h3>Drop your image here or browse</h3>
              <span title={formats}>
                Supported formats
                {formats}
              </span>
            </>
          )}
        </div>

        <input
          accept={accept}
          hidden
          multiple={multiple}
          ref={this.ref}
          type="file"
          onChange={this.handleChange}
        />
      </FieldBase>
    );
  };
}

export default FilesField;
