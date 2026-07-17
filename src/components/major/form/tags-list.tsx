"use client";

import {
  FC,
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { Checkbox, Input, Spinner } from "@/src/components/ui";
import InputWrapper from "./input-wrapper";
import { useBlogPostsTagsList } from "@/src/hooks/blogpost/useBlogPostsTagsList";

const TAG_ROW_HEIGHT = 36;
const TAG_LIST_HEIGHT = 240;

interface SimpleTagsListProps {
  label?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  onBlur?: () => void;
}

const mergeTagNames = (
  customTags: string[],
  selectedTags: string[],
  apiTagNames: string[],
) => {
  const ordered: string[] = [];

  customTags.forEach((tag) => {
    if (!ordered.includes(tag)) {
      ordered.push(tag);
    }
  });

  selectedTags.forEach((tag) => {
    if (!ordered.includes(tag)) {
      ordered.push(tag);
    }
  });

  apiTagNames.forEach((tag) => {
    if (!ordered.includes(tag)) {
      ordered.push(tag);
    }
  });

  return ordered;
};

export const SimpleTagsList: FC<SimpleTagsListProps> = ({
  label,
  value = [],
  onChange,
  onBlur,
}) => {
  const [newTagInput, setNewTagInput] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const { blogPosts: tags, blogPostsLoading, blogPostsError } =
    useBlogPostsTagsList();

  const apiTagNames = useMemo(
    () => (tags ?? []).map((tag) => tag.name),
    [tags],
  );

  const allTagNames = useMemo(
    () => mergeTagNames(customTags, value, apiTagNames),
    [customTags, value, apiTagNames],
  );

  const rowVirtualizer = useVirtualizer({
    count: allTagNames.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => TAG_ROW_HEIGHT,
    overscan: 8,
  });

  const handleToggleTag = (tagName: string, checked: boolean) => {
    if (checked) {
      onChange?.(value.includes(tagName) ? value : [...value, tagName]);
      return;
    }

    onChange?.(value.filter((tag) => tag !== tagName));
  };

  const handleAddTag = () => {
    const trimmedTag = newTagInput.trim();

    if (!trimmedTag) {
      return;
    }

    setCustomTags((prev) => [trimmedTag, ...prev.filter((tag) => tag !== trimmedTag)]);

    if (!value.includes(trimmedTag)) {
      onChange?.([trimmedTag, ...value]);
    }

    setNewTagInput("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  return (
    <InputWrapper label={label}>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="New tag"
          value={newTagInput}
          onChange={(event) => setNewTagInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={onBlur}
        />

        <div
          className={clsx(
            "rounded-lg border-1 border-muted-light bg-background p-4",
            blogPostsLoading && "flex items-center justify-center",
          )}
          style={{ height: TAG_LIST_HEIGHT }}
        >
          {blogPostsLoading ? (
            <Spinner />
          ) : blogPostsError ? (
            <p className="text-sm text-danger-main">Failed to load tags.</p>
          ) : (
            <div ref={listRef} className="h-full overflow-auto">
              <div
                className="relative w-full"
                style={{ height: rowVirtualizer.getTotalSize() }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const tagName = allTagNames[virtualRow.index];

                  return (
                    <div
                      key={tagName}
                      className="absolute left-0 top-0 flex w-full items-center gap-2 px-1"
                      style={{
                        height: TAG_ROW_HEIGHT,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <Checkbox
                        checked={value.includes(tagName)}
                        onCheckedChange={(checked) =>
                          handleToggleTag(tagName, checked === true)
                        }
                      />
                      <span className="text-sm text-muted-dark">{tagName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </InputWrapper>
  );
};

interface FormTagsListProps extends Omit<SimpleTagsListProps, "value" | "onChange"> {
  name: string;
}

export const FormTagsList: FC<FormTagsListProps> = ({
  name,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <SimpleTagsList
            {...rest}
            value={field.value ?? []}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          <p className="form-error-msg">
            {errors[name]?.message as string}
          </p>
        </>
      )}
    />
  );
};
