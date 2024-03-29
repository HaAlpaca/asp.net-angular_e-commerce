using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Core.Interfaces;
using Core.Specification;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IMapper _mapper;

        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductBrand> brandRepo,
        IGenericRepository<ProductType> typeRepo,
        IMapper mapper,
        IUnitOfWork unitOfWork)
        {
            this._productRepo = productRepo;
            this._brandRepo = brandRepo;
            this._typeRepo = typeRepo;
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepo.CountAsync(countSpec);
            var products = await _productRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _brandRepo.ListAllAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _typeRepo.ListAllAsync());
        }


        // post
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            var check = await _productRepo.AddAsync(product);
            if (!check) return NotFound(new ApiResponse(404));
            return product;
        }

        // put
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
        {
            var productEntity = await _productRepo.GetByIdAsync(id);

            productEntity.Name = product.Name;
            productEntity.PictureUrl = product.PictureUrl;
            productEntity.Price = product.Price;
            productEntity.ProductBrand = product.ProductBrand;
            productEntity.ProductTypeId = product.ProductTypeId;
            productEntity.Description = product.Description;

            await _productRepo.UpdateAsync(productEntity);
            return product;
        }
        // delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<Boolean>> DeleteProduct(int id)
        {
            var check = await _productRepo.DeleteAsync(id);
            if (!check) return false;
            return true;
        }
    }
}