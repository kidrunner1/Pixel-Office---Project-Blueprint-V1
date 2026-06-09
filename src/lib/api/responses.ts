import { NextResponse } from "next/server";

type SuccessResponse<TData> = {
  success: true;
  data: TData;
};

type ErrorResponse = {
  success: false;
  message: string;
};

export function successResponse<TData>(
  data: TData,
  init?: ResponseInit,
): NextResponse<SuccessResponse<TData>> {
  return NextResponse.json({ success: true, data }, init);
}

export function errorResponse(
  message: string,
  status: number,
): NextResponse<ErrorResponse> {
  return NextResponse.json({ success: false, message }, { status });
}
