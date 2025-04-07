<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nombres'   => 'required',
            'apellidos' => 'required',
            'dni'               =>  ['required', Rule::unique('users')->ignore($this->request->get('id'))],
            'roles'             =>  'required',
            'cantones'          =>  ''
        ];
    }
    public function messages(): array
    {
        return [
            'nombres_completos.required'  => 'El/Los nombre(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'roles.required'              =>  'Selecciona un role'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
