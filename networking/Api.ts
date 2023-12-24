"use client";

import { ResModel } from "@/types/common/ResModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Notification, Button, ButtonGroup } from "@douyinfe/semi-ui";
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
export interface Params {
  [key: string]: string | number | boolean | undefined | null;
}

export class Api {
  private getToken: () => string;
  private host: string;
  private signal?: AbortSignal;
  private headers?: HeadersInit;
  private router: AppRouterInstance;
  constructor(
    router: AppRouterInstance,
    headers?: HeadersInit,
    signal?: AbortSignal
  ) {
    this.getToken = () =>
      typeof window !== "undefined" ? localStorage.getItem("t") || "" : "";
    this.host = process.env.NEXT_PUBLIC_API_HOST || "";
    this.signal = signal;
    this.headers = headers;
    this.router = router;
  }

  async get<T>(path: string, params?: Params): Promise<ResModel<T>> {
    const url = new URL(`${this.host}${path}`);
    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      url.search = queryString;
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        t: this.getToken(),
        ...this.headers,
      },
      cache: "no-store",
    };

    // 创建一个新的 AbortController 实例并设置超时为 30 秒（30000 毫秒）
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    requestOptions.signal = signal;
    setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(url.toString(), requestOptions);
      const data = await response.json();
      return this.errorFilter(response, data);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the data.");
      // Handle error
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }
  async patch<T>(
    path: string,
    params?: Params,
    body?: any
  ): Promise<ResModel<T>> {
    const url = new URL(`${this.host}${path}`);

    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      url.search = queryString;
    }

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        t: this.getToken(),
        ...this.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    // 创建一个新的 AbortController 实例并设置超时为 30 秒（30000 毫秒）
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    requestOptions.signal = signal;
    setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url.toString(), requestOptions);
      const data = await response.json();
      return this.errorFilter(response, data);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the data.");
      // Handle error
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }
  async post<T>(
    path: string,
    params?: Params,
    body?: any
  ): Promise<ResModel<T>> {
    const url = new URL(`${this.host}${path}`);

    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      url.search = queryString;
    }

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        t: this.getToken(),
        ...this.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    // 创建一个新的 AbortController 实例并设置超时为 30 秒（30000 毫秒）
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    requestOptions.signal = signal;
    setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url.toString(), requestOptions);
      const data = await response.json();

      return this.errorFilter(response, data);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the data.");
      // Handle error
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }
  async del<T>(
    path: string,
    params?: Params,
    body?: any
  ): Promise<ResModel<T>> {
    const url = new URL(`${this.host}${path}`);

    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      url.search = queryString;
    }

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        t: this.getToken(),
        ...this.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    // 创建一个新的 AbortController 实例并设置超时为 30 秒（30000 毫秒）
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    requestOptions.signal = signal;
    setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url.toString(), requestOptions);
      const data = await response.json();

      return this.errorFilter(response, data);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting the data.");
      // Handle error
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }

  async put(
    path: string,
    file: Blob,
    contentType: string,
    params?: Params
  ): Promise<Response> {
    const url = new URL(path);

    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString();
      url.search = queryString;
    }

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        ...this.headers,
      },
      body: file,
    };

    // 创建一个新的 AbortController 实例并设置超时为 30 秒（30000 毫秒）
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    requestOptions.signal = signal;
    setTimeout(() => controller.abort(), 30000);

    try {
      return await fetch(url.toString(), requestOptions);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the data.");
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }

  async errorFilter<T>(
    response: Response,
    data: ResModel<T>
  ): Promise<ResModel<T>> {
    if (response.status !== 200) {
      let opts = {
        title: "Error",
        content: "访问出错",
        duration: 3,
      };
      Notification.error(opts);
    } else if (data?.code !== 0) {
      let opts = {
        title: "Error",
        content: data.msg,
        duration: 3,
      };
      Notification.error(opts);
    }
    if (data?.code == 401) {
      this.router.push("/login");
    }

    return data;
  }
}
