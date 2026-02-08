import { env } from "../config";
import * as url from "url";

interface PaginationResult {
  limit: number;
  offset: number | undefined;
  total_pages: number;
  total_count: number;
  previous_page: number | null;
  current_page: number;
  next_page: number | null;
  previous_page_link: string | null;
  current_page_link: string;
  next_page_link: string | null;
  first_page_link: string;
  last_page_link: string;
}

interface LinkResult {
  previous_page_link: string | null;
  current_page_link: string;
  next_page_link: string | null;
  first_page_link: string;
  last_page_link: string;
}

function parseLink(
  newOffset: number,
  baseUrl: string,
  newLimit: number
): string {
  try {
    const parsedUrl = new url.URL(baseUrl);

    parsedUrl.searchParams.set("offset", newOffset.toString());
    parsedUrl.searchParams.set("limit", newLimit.toString());

    return parsedUrl.toString();
  } catch (error: any) {
    throw new Error("URL Update Error");
  }
}

function generateLinks(
  offset: number,
  baseUrl: string,
  limit: number,
  total_pages: number
): LinkResult {
  try {
    let nextPageNumber = Math.floor(offset / limit) + 1;
    return {
      previous_page_link:
        offset > 0 ? parseLink(offset - limit, baseUrl, limit) : null,
      current_page_link: parseLink(offset, baseUrl, limit),
      next_page_link:
        nextPageNumber < total_pages
          ? parseLink(nextPageNumber * limit, baseUrl, limit)
          : null,
      first_page_link: parseLink(0, baseUrl, limit),
      last_page_link: parseLink((total_pages - 1) * limit, baseUrl, limit),
    };
  } catch (error: any) {
    console.log("Page Link Error :", error);
    throw new Error("Page Link Error");
  }
}

function pagination<T>(options: {
  offset?: number;
  page?: number;
  limit: number;
  total_count: number;
  url?: string;
}): PaginationResult {
  try {
    let { limit, offset = 0, page, total_count, url } = options;

    if (!offset) {
      offset = 0;
    }

    if (!page) {
      page = Math.floor(offset / limit) + 1;
    }

    const total_pages = Math.ceil(total_count / limit);

    const pageUrl = url ? "http://localhost:3001" + url : env.FRONT_END_URL;

    const paginationLinks = generateLinks(offset, pageUrl, limit, total_pages);

    return {
      limit,
      offset,
      total_pages,
      total_count,
      previous_page: page == 1 ? null : page - 1,
      current_page: page,
      next_page: page < total_pages ? page + 1 : null,
      ...paginationLinks,
    };
  } catch (error: any) {
    console.log("error: pagination function", error);
    throw new Error("Pagination Error");
  }
}

export { pagination, generateLinks };
