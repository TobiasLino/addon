#include "example.h"

using namespace std;

double example::add(double x)
{
	for (int i = 0; i < 1000000000; ++i) {
		x += 333;
	}
	return x;
}

Napi::Number example::addWrapped(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if ((info.Length() < 1) || (!info[0].IsNumber())) {
        Napi::TypeError::New(env, "arg1::Number expected").ThrowAsJavaScriptException();
    }

    Napi::Number x = info[0].As<Napi::Number>();

    Napi::Number result = Napi::Number::New(env, example::add(x.DoubleValue()));

    return result;
}

Napi::Object example::Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("add", Napi::Function::New(env, example::addWrapped));
    return exports;
}
