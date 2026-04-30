import { expectType } from 'ts-data-forge';
import {
  type JsonPrimitive as JsonPrimitiveT,
  type JsonValue as JsonValueT,
  type ReadonlyRecord,
} from 'ts-type-forge';
import { array } from '../array/index.mjs';
import { union } from '../compose/index.mjs';
import { recursion } from '../other-types/index.mjs';
import { boolean, nullType, number, string } from '../primitives/index.mjs';
import { keyValueRecord } from '../record/index.mjs';
import { type Type, type TypeOf } from '../type.mjs';

export const JsonPrimitive = union([nullType, number(), string(), boolean()]);

if (import.meta.vitest !== undefined) {
  test('JsonPrimitive', () => {
    expectType<TypeOf<typeof JsonPrimitive>, JsonPrimitiveT>('=');

    expectType<JsonPrimitiveT, null | boolean | number | string>('=');

    expect(JsonPrimitive.defaultValue).toBeNull();
  });
}

export const JsonValue: Type<JsonValueT> = recursion('JsonValue', () =>
  union([JsonPrimitive, keyValueRecord(string(), JsonValue), array(JsonValue)]),
);

if (import.meta.vitest !== undefined) {
  test('JsonValue', () => {
    expectType<TypeOf<typeof JsonValue>, JsonValueT>('=');

    expect(JsonValue.defaultValue).toBeNull();
  });
}

type JsonObject = ReadonlyRecord<string, JsonValueT>;

export const JsonObject = keyValueRecord(string(), JsonValue);
