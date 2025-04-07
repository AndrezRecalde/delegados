<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EscaneadorRequest extends FormRequest
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
            'nombres'   =>  'required',
            'apellidos' =>  'required',
            'dni'               =>  ['required', Rule::unique('escaneadores')->ignore($this->request->get('id'))],
            'telefono'          =>  '',
            'canton_id'         =>  'required',
            'parroquia_id'      =>  'required',
            'recinto_id'        =>  'required'
        ];
    }
    public function messages(): array
    {
        return [
            'nombres.required'      =>  'El/Los nombre(s) es obligatorio',
            'apellidos.required'    =>  'El/Los apellido(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'dni.unique'                  =>  'El número de cédula ya está registrado',
            'canton_id.required'          =>  'El canton es requerido',
            'parroquia_id.required'       =>  'El canton es requerido',
            'recinto_id.required'         =>  'El canton es requerido',
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
